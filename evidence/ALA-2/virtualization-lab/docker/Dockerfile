FROM ubuntu:22.04
RUN apt-get update && apt-get install -y --no-install-recommends \
    stress-ng procps iputils-ping curl nano iproute2 \
    && rm -rf /var/lib/apt/lists/*
CMD ["sleep", "infinity"]
