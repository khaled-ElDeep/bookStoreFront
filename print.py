import sys,json
import time
def main():
    for line in sys.stdin:
      time.sleep(9)  
      print("Receivedllllll CMD " + line[:-1])
   
    
    
if __name__=='__main__':
    main()