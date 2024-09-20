import os
import subprocess
import sys
import time
import argparse
from yaspin import yaspin
from yaspin.spinners import Spinners

PYTHON_INSTRUCTIONS = """ 
Download here ⬇️
https://www.python.org/downloads/
"""

services_dir = 'services'

group_subs_file_path = os.path.join(os.path.dirname(__file__), 'group_subs.yaml')


def error(spinner, message):
    spinner.fail("❌")
    print(f"Error: {message}", file=sys.stderr)
    sys.exit(1)


def run_command(command, check=False):
    result = subprocess.run(command, shell=True, capture_output=True, text=True)

    if result.returncode != 0:
        if check:
            raise subprocess.CalledProcessError(
                result.returncode, command, output=result.stdout, stderr=result.stderr
            )
        return None

    return result.stdout.strip()


def check_python_installed():
    with yaspin(text="Checking Python dependency...") as spinner:
        version_check = run_command("python3 --version")
        if version_check is None:
            error(spinner, f"Python 3.11+ is required for quickstart. {PYTHON_INSTRUCTIONS}")
        try:
            version_parts = version_check.strip("Python").split('.')
            major_version = int(version_parts[0])
            minor_version = int(version_parts[1])
            print(major_version, minor_version)
            if major_version < 3 and minor_version > 11:
                error(spinner,
                      f"Python 3.11+ is required for this project. Found version: {version_check.strip()} {PYTHON_INSTRUCTIONS}")
        except (IndexError, ValueError):
            error(spinner,
                  f"Python 3.11+ is required for this project. Unable to determine Python version: {version_check.strip()} {PYTHON_INSTRUCTIONS}")
        spinner.ok("✅")
        spinner.write(f"Supported version found: {version_check.strip()}")


def create_project(project_name):
    with yaspin(text=f"Creating project {project_name}...") as spinner:
        try:
            run_command(f"diagrid project create {project_name}", check=True)
            spinner.ok("✅")
        except subprocess.CalledProcessError as e:
            spinner.fail("❌")
            if e.output:
                spinner.write(f"Error: {e.output}")
            if e.stderr:
                spinner.write(f"Error: {e.stderr}")
            sys.exit(1)


def create_dynamodb_table(table_name: str):
    with yaspin(text=f"Creating dynamodb store {table_name}...") as spinner:
        try:

            run_command(f"aws dynamodb create-table --table-name {table_name} --attribute-definitions AttributeName=key,AttributeType=S --key-schema AttributeName=key,KeyType=HASH \
--provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5")
            spinner.ok("✅")
        except subprocess.CalledProcessError as e:
            spinner.fail(f"❌")
            if e.output:
                spinner.write(f"Error: {e.output}")
            if e.stderr:
                spinner.write(f"Error: {e.stderr}")
            sys.exit(1)


def create_appid(project_name, appid_name):
    with yaspin(text=f"Creating App ID {appid_name}...") as spinner:
        try:
            run_command(f"diagrid appid create -p {project_name} {appid_name}", check=True)
            time.sleep(10)
            spinner.ok("✅")
        except subprocess.CalledProcessError as e:
            spinner.fail(f"❌")
            if e.output:
                spinner.write(f"Error: {e.output}")
            if e.stderr:
                spinner.write(f"Error: {e.stderr}")
            sys.exit(1)


def create_component(project_name, component_name, component_type, scope,
                     table_name=None):
    with yaspin(text=f"Creating component {component_name}...", timer=True) as spinner:
        try:
            CONNECTION_ACCESS_KEY = os.getenv('AWS_ACCESS_KEY')
            CONNECTION_SECRET_KEY = os.getenv('AWS_SECRET_KEY')
            AWS_DEFAULT_REGION = os.getenv('AWS_DEFAULT_REGION')
            if component_type == "pubsub":
                run_command(
                    f"diagrid component create {component_name} --type pubsub.aws.snssqs --metadata accessKey={CONNECTION_ACCESS_KEY} --metadata secretKey={CONNECTION_SECRET_KEY} --metadata awsRegion={AWS_DEFAULT_REGION} --project {project_name}"
                )
                time.sleep(35)
                spinner.ok("✅")
            else:
                run_command(
                    f"diagrid component create {component_name} --type state.aws.dynamodb --metadata accessKey={CONNECTION_ACCESS_KEY} --metadata secretKey={CONNECTION_SECRET_KEY} --metadata awsRegion={AWS_DEFAULT_REGION} --metadata table={table_name} --scopes {scope} --project {project_name}",
                    check=True)
                spinner.ok("✅")


        except subprocess.CalledProcessError as e:
            spinner.fail("❌")
            if e.output:
                spinner.write(f"{e.output}")
            if e.stderr:
                spinner.write(f"{e.stderr}")
            sys.exit(1)


def create_subscription(project_name: str, subscription_name: str):
    with yaspin(text=f"Creating subscription {subscription_name} for project {project_name}") as spinner:
        try:
            print(f"Group Subscription yaml file path {group_subs_file_path}")
            run_command(
                f"diagrid subscriptions apply --wait --file {group_subs_file_path}")
            spinner.ok("✅")
        except subprocess.CalledProcessError as e:
            spinner.fail("❌")
            if e.output:
                spinner.write(f"{e.output}")
            if e.stderr:
                spinner.write(f"{e.stderr}")
            sys.exit(1)


def check_appid_status(project_name, appid_name):
    max_attempts = 20
    attempt = 1
    last_status = None

    with yaspin(text=f"Waiting for App ID {appid_name} to become ready. This may take 1-2 minutes...",
                timer=True) as spinner:
        while attempt <= max_attempts:
            status_output = run_command(f"diagrid appid get {appid_name} -p {project_name}")

            status_lines = status_output.split('\n')
            status = None
            for line in status_lines:
                if 'Status:' in line:
                    status = line.split('Status:')[1].strip()
                    last_status = status
                    break

            if status and (status.lower() == "ready" or status.lower() == "available"):
                spinner.ok("✅")
                return

            time.sleep(10)
            attempt += 1

        spinner.fail("❌")
        spinner.write(f"App ID {appid_name} is still provisioning")
        sys.exit(1)


def set_default_project(project_name):
    with yaspin(text=f"Setting default project to {project_name}...") as spinner:
        try:
            run_command(f"diagrid project use {project_name}", check=True)
            spinner.ok("✅")
        except subprocess.CalledProcessError as e:
            spinner.fail("❌")
            spinner.write("Failed to set default project")
            if e.output:
                spinner.write(f"{e.output}")
            if e.stderr:
                spinner.write(f"{e.stderr}")
            sys.exit(1)


def retrieve_folder_names() -> []:
    services = []
    for folder_name in os.listdir(services_dir):
        folder_path = os.path.join(services_dir, folder_name)
        if os.path.isdir(folder_path):  # Check if it's a directory
            print(f"folder name is {folder_name}")
            services.append(folder_name)

        else:
            print(f"directory does not exist: {folder_path}")
            sys.exit(1)
    return services


def scaffold_and_update_config(config_file):
    with yaspin(text="Preparing dev config file...") as spinner:
        scaffold_output = run_command("diagrid dev scaffold", check=True)
        if scaffold_output is None:
            error(spinner, "Failed to prepare dev config file")

        # Create and activate a virtual environment
        env_name = "diagrid-venv"
        if os.path.exists(env_name):
            # spinner.write(f"Existing virtual environment found: {env_name}")
            # spinner.write(f"Deleting existing virtual environment: {env_name}")
            run_command(f"rm -rf {env_name}", check=True)

        # spinner.write(f"Creating virtual environment: {env_name}")
        run_command(f"python3 -m venv {env_name}", check=True)

        # spinner.write(f"Installing pyyaml in the virtual environment: {env_name}")
        run_command(f"./{env_name}/bin/pip install pyyaml")

        # Run the Python script to update the dev config file
        # spinner.write("Updating dev config file...")
        run_command(f"./{env_name}/bin/python scaffold.py")
        spinner.ok("✅")


def main():
    prj_name = os.getenv('GROUP_CHAT_MICROSERVICES')

    config_file_name = f"dev-{prj_name}.yaml"
    os.environ['CONFIG_FILE'] = config_file_name

    parser = argparse.ArgumentParser(description="Run the setup script for Diagrid projects.")
    parser.add_argument('--project-name', type=str, default=prj_name,
                        help="The name of the project to create/use.")
    parser.add_argument('--config-file', type=str, default=config_file_name,
                        help="The name of the config file to scaffold and use.")
    args = parser.parse_args()

    project_name = args.project_name
    config_file = args.config_file

    check_python_installed()

    create_project(prj_name)

    service_name_list: [] = retrieve_folder_names()

    # CREATE APP IDS
    for service_name in service_name_list:
        print(f"folder name is {service_name}")
        create_appid(prj_name, service_name)

    # CREATE DYNAMODB TABLE
    for service_name in service_name_list:
        print(f"folder name is {service_name}")
        create_dynamodb_table(f"{service_name}-table")

    for service_name in service_name_list:
        print(f"folder name is {service_name}")
        check_appid_status(project_name, service_name)

    # CREATE PUBSUB CONNECTION
    component_type = "pubsub"
    component_name = "aws-pubsub"

    scopes = ', '.join(f'"{service_name}"' for service_name in service_name_list)
    print(f"scopes are {scopes}")

    create_component(prj_name, component_name, component_type, scopes,
                     )

    # CREATE STATE CONNECTION
    for service_name in service_name_list:
        component_name = f"{service_name}-table"
        component_type = "state"
        scope = service_name
        table_name = f"{service_name}-table"

        create_component(prj_name, component_name, component_type, scope,
                         table_name)

    subscription_name = "group-subscription-topic"

    # CREATING SUBSCRIPTION
    create_subscription(prj_name, subscription_name)

    set_default_project(prj_name)

    # Check if the dev file already exists and remove it if it does
    if os.path.isfile(config_file):
        print(f"Existing dev config file found: {config_file}")
        try:
            os.remove(config_file)
            print(f"Deleted existing config file: {config_file}")
        except Exception as e:
            with yaspin(text=f"Error deleting file {config_file}") as spinner:
                error(spinner, f"Error deleting file {config_file}: {e}")

    scaffold_and_update_config(config_file)


if __name__ == "__main__":
    main()
