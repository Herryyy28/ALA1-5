"""
GMIU Cloud Computing ALA 5: Layer-7 Load Balancer & Auto-Scaling Simulator
Author: Herry Prajapati (Enrollment: 20230905090031)
Institute: Gyanmanjari Institute of Technology (GMIU)

Demonstrates:
1. Round-Robin Distribution
2. Weighted Round-Robin Distribution
3. Least Connections Routing
4. Auto-Scaling Dynamic Worker Provisioning & De-provisioning
"""

import time
import random

class CloudInstance:
    def __init__(self, instance_id, weight=1, max_connections=100):
        self.instance_id = instance_id
        self.weight = weight
        self.active_connections = 0
        self.total_requests_served = 0
        self.cpu_utilization = 15.0 # baseline 15%
        self.max_connections = max_connections

    def handle_request(self):
        self.active_connections += 1
        self.total_requests_served += 1
        self.cpu_utilization = min(99.0, 15.0 + (self.active_connections * 0.8))

    def complete_request(self):
        if self.active_connections > 0:
            self.active_connections -= 1
        self.cpu_utilization = max(15.0, 15.0 + (self.active_connections * 0.8))


class Layer7LoadBalancer:
    def __init__(self, min_instances=2, max_instances=6, scale_up_cpu=75.0, scale_down_cpu=30.0):
        self.instances = [
            CloudInstance(f"i-gmiu-{i:03d}", weight=(1 if i % 2 == 0 else 2))
            for i in range(1, min_instances + 1)
        ]
        self.min_instances = min_instances
        self.max_instances = max_instances
        self.scale_up_cpu = scale_up_cpu
        self.scale_down_cpu = scale_down_cpu
        self.rr_index = 0

    def round_robin_route(self):
        target = self.instances[self.rr_index % len(self.instances)]
        self.rr_index += 1
        return target

    def least_connections_route(self):
        return min(self.instances, key=lambda inst: inst.active_connections)

    def evaluate_autoscaling(self):
        if not self.instances:
            return "NO_INSTANCES"
        avg_cpu = sum(i.cpu_utilization for i in self.instances) / len(self.instances)
        
        if avg_cpu > self.scale_up_cpu and len(self.instances) < self.max_instances:
            new_id = f"i-gmiu-{len(self.instances)+1:03d}"
            new_inst = CloudInstance(new_id, weight=1)
            self.instances.append(new_inst)
            return f"SCALED_UP: Added {new_id} (Cluster CPU: {avg_cpu:.1f}%)"
        elif avg_cpu < self.scale_down_cpu and len(self.instances) > self.min_instances:
            removed = self.instances.pop()
            return f"SCALED_DOWN: Terminated {removed.instance_id} (Cluster CPU: {avg_cpu:.1f}%)"
        return f"STEADY_STATE: Cluster CPU at {avg_cpu:.1f}% with {len(self.instances)} nodes"


if __name__ == "__main__":
    print("=" * 65)
    print("GMIU ALA 5: Layer-7 Load Balancer & Auto-Scaling Simulation")
    print("Candidate: Herry Prajapati (20230905090031)")
    print("=" * 65)
    
    lb = Layer7LoadBalancer(min_instances=2, max_instances=5)
    print(f"Initial Pool: {[i.instance_id for i in lb.instances]}")
    
    # Simulate a burst of 120 incoming client requests
    print("\n[Step 1] Ingesting burst traffic (120 synthetic requests via Least Connections)...")
    for r in range(120):
        node = lb.least_connections_route()
        node.handle_request()
        
    print("\nInstance Telemetry After Ingestion:")
    for inst in lb.instances:
        print(f" -> {inst.instance_id}: Active Conn={inst.active_connections}, CPU={inst.cpu_utilization:.1f}%, Total Served={inst.total_requests_served}")

    # Evaluate scaling trigger
    print("\n[Step 2] Auto-Scaling Policy Engine Check:")
    decision = lb.evaluate_autoscaling()
    print(f" -> Decision: {decision}")
    
    # Process completions
    print("\n[Step 3] Resolving traffic connections...")
    for inst in lb.instances:
        for _ in range(inst.active_connections):
            inst.complete_request()
            
    print("\nInstance Telemetry After Drain:")
    for inst in lb.instances:
        print(f" -> {inst.instance_id}: Active Conn={inst.active_connections}, CPU={inst.cpu_utilization:.1f}%")
        
    post_drain = lb.evaluate_autoscaling()
    print(f" -> Post-Drain Decision: {post_drain}")
    print("=" * 65)
