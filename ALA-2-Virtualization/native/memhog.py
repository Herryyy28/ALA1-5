import sys
limit_mb = int(sys.argv[1]); blocks=[]
for mb in range(50, limit_mb+1, 50):
    b = bytearray(50*1024*1024)
    for i in range(0, len(b), 4096): b[i] = 1      # touch every page so memory is really used
    blocks.append(b)
    print(f"allocated {mb} MB", flush=True)
print("finished without being killed")
