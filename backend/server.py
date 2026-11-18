#!/usr/bin/env python3
"""
GMIU Cloud Computing Practical Suite - Local Backend Mock Server
Candidate: Herry Prajapati | Enrollment: 20230905090031
Subject: Cloud Computing | Department of IT | GMIU
"""

import http.server
import socketserver
import json
import time

PORT = 8080

class GMIUCloudAPIHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/health':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            resp = {
                "status": "healthy",
                "service": "GMIU Cloud Computing ALA Suite",
                "student": "Herry Prajapati",
                "enrollment": "20230905090031",
                "uptime": time.time()
            }
            self.wfile.write(json.dumps(resp).encode('utf-8'))
        elif self.path.startswith('/api/students'):
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            resp = {
                "enrollment": "20230905090031",
                "name": "PRAJAPATI HERRY",
                "department": "Information Technology",
                "university": "Gyanmanjari Institute of Technology (GMIU)",
                "academic_year": "2026-2027",
                "alas_submitted": 0
            }
            self.wfile.write(json.dumps(resp).encode('utf-8'))
        else:
            super().do_GET()

    def do_POST(self):
        if self.path == '/api/submissions':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            self.send_response(201)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            resp = {
                "status": "success",
                "message": "Submission recorded successfully",
                "timestamp": time.time()
            }
            self.wfile.write(json.dumps(resp).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == '__main__':
    with socketserver.TCPServer(("", PORT), GMIUCloudAPIHandler) as httpd:
        print(f"[INFO] GMIU Cloud API Server listening on port {PORT}...")
        httpd.serve_forever()
