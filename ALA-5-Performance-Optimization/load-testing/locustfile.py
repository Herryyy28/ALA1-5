"""
GMIU Cloud Computing Practical Suite - ALA 5 Performance Optimization
Locust Load Testing Script
Student: Herry Prajapati | Enrollment: 20230905090031
Subject: Cloud Computing | Department of IT | GMIU
"""

import time
import random
from locust import HttpUser, task, between, events

class GMIUStudentPortalUser(HttpUser):
    # Think time between user requests simulating genuine student navigation
    wait_time = between(0.5, 1.5)

    @task(4)
    def view_dashboard(self):
        """Simulates student accessing dashboard overview & ALA status."""
        with self.client.get("/", catch_response=True) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"Status code {response.status_code}")

    @task(3)
    def query_enrollment_status(self):
        """Simulates querying student directory status."""
        test_enrollments = [
            "20230905090031", # Herry Prajapati
            "20230905090001", # Sonani Zeel
            "20230905090501", # Joshi Garima
            "20230905090529"  # Somani Tirth
        ]
        target_enr = random.choice(test_enrollments)
        with self.client.get(f"/api/students/{target_enr}", catch_response=True) as response:
            if response.status_code in (200, 404): # 200 or 404 handled gracefully
                response.success()
            else:
                response.failure(f"Unexpected response code: {response.status_code}")

    @task(1)
    def submit_ala_assignment(self):
        """Simulates submitting an ALA assignment evidence bundle."""
        payload = {
            "enrollment_number": "20230905090031",
            "ala_id": random.choice(["ALA-1", "ALA-2", "ALA-3", "ALA-4", "ALA-5"]),
            "notes": "Automated performance load test execution trace.",
            "timestamp": time.time()
        }
        with self.client.post("/api/submissions", json=payload, catch_response=True) as response:
            if response.status_code in (200, 201, 204):
                response.success()
            else:
                response.failure(f"Submission failed with status: {response.status_code}")
