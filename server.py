#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys
from datetime import datetime

PORT = 3000
HOST = "0.0.0.0"

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] GET {self.path}")
        return super().do_GET()
    
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super().end_headers()

def main():
    os.chdir('/home/danang/danang_web')
    
    with socketserver.TCPServer((HOST, PORT), CustomHTTPRequestHandler) as httpd:
        print(f"🚀 Server started successfully!")
        print(f"📁 Serving directory: /home/danang/danang_web")
        print(f"🌐 Access your website at:")
        print(f"   • http://localhost:{PORT}")
        print(f"   • http://127.0.0.1:{PORT}")
        print(f"   • http://[your-local-ip]:{PORT}")
        print(f"\n📊 Server logs:")
        print("-" * 50)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n⛔ Server stopped by user")
            sys.exit(0)

if __name__ == "__main__":
    main()