# GMIU Cloud Computing ALA 2: Container Virtualization Blueprint
# Demonstrating OS-Level Virtualization via Linux Containers (Namespaces & Cgroups)

FROM ubuntu:22.04

LABEL maintainer="Herry Prajapati <20230905090031@gmiu.edu.in>"
LABEL institute="Gyanmanjari Institute of Technology (GMIU)"
LABEL subject="Cloud Computing - Virtualization ALA 2"

# Prevent interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install core diagnostic, system monitoring, and networking utilities
RUN apt-get update && apt-get install -y \
    procps \
    iproute2 \
    iputils-ping \
    curl \
    net-tools \
    htop \
    sysstat \
    util-linux \
    && rm -rf /var/lib/apt/lists/*

# Create dedicated non-root student user to enforce privilege isolation
RUN useradd -ms /bin/bash student && echo "student:gmiu2026" | chpasswd

WORKDIR /workspace
COPY . /workspace

USER student
CMD ["/bin/bash"]
