import threading
import time
import select
import sys


kbdInput = ''
playingID = ''

def kbdListener():
    global kbdInput
    while True:
     kbdInput = raw_input()
def receive():
        i=0
        while(i<3000):
          i=i+1
          print i
          time.sleep(1)
         
def main():

 while True:
        c = raw_input()
	print c

if __name__ =='__main__':
    main();  
