# !/usr/bin/python
import sys
from bluetooth import *
import threading
import time
import select

kbdInput = ''
playingID = ''

server_sock=BluetoothSocket( RFCOMM )
server_sock.bind(("",PORT_ANY))
server_sock.listen(1)
 
port = server_sock.getsockname()[1]

advertise_service( server_sock, "Bluetooth Serial Port",
service_classes = [ SERIAL_PORT_CLASS ],
profiles = [ SERIAL_PORT_PROFILE ] )


while True:
   
    client_sock, client_info = server_sock.accept()
    print 'success'
    def receive():
        try:
            while True:
                data = client_sock.recv(1024)
                if data == "end": break
                print data   
                sys.stdout.flush() 
        except IOError:
           print 'here error'
    listenerl = threading.Thread(target=receive)
    listenerl.start()
    try:
        while True:
            c=raw_input()
            if c == 'end':break
            sys.stdout.flush() 
	    client_sock.send(c)
    except IOError:
        print 'select error'
           
    client_sock.close()
    print 'disconnect'

server_sock.close()
print "all done"    
  
  
  
