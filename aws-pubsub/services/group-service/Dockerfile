# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG PYTHON_VERSION=3.11.6
FROM --platform=linux/amd64 python:${PYTHON_VERSION}-slim as base

# Prevents Python from writing pyc files.
ENV PYTHONDONTWRITEBYTECODE=1

ENV DAPR_APP_ID=group-service
ENV UVICORN_PORT 5002
ENV DAPR_AWS_PUB_SUB_BROKER=aws-pubsub
ENV DAPR_GROUP_SUBSCRIPTION_TOPIC=group-subscription-topic
ENV  DAPR_GROUPS_TABLE=group-service-table
ENV DAPR_CLIENT_TIMEOUT_SECONDS=10
ENV DAPR_GRPC_ENDPOINT=https://grpc-prj240898.api.cloud.diagrid.io:443
ENV DAPR_HTTP_ENDPOINT=https://http-prj240898.api.cloud.diagrid.io

# Keeps Python from buffering stdout and stderr to avoid situations where
# the application crashes without emitting any logs due to buffering.
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Create a non-privileged user that the app will run under.
# See https://docs.docker.com/go/dockerfile-user-best-practices/
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

# Copy the requirements file to the working directory
COPY requirements.txt .

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.cache/pip to speed up subsequent builds.
# Leverage a bind mount to requirements.txt to avoid having to copy them into
# into this layer.
RUN --mount=type=cache,target=/root/.cache/pip \
    --mount=type=bind,source=requirements.txt,target=requirements.txt \
    python -m pip install -r requirements.txt

# Switch to the non-privileged user to run the application.
USER appuser

# Copy the source code into the container.
COPY . .

ENV UVICORN_PORT 5002

# Run the FastAPI application using uvicorn server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]