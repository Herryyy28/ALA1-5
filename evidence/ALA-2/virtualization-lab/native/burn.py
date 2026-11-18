import time, sys
dur = float(sys.argv[1]); t0=time.time(); c0=time.process_time()
while time.time()-t0 < dur: pass
wall=time.time()-t0; cpu=time.process_time()-c0
print(f"wall={wall:.2f}s  cpu_time={cpu:.2f}s  => effective CPU use = {100*cpu/wall:.0f}% of one core")
