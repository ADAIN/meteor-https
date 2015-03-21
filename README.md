# Meteor https proxy server package

**Table of Contents**

  - [Usage](#usage)
  - [Environment variables description](#environment-variables-description)

## Usage

### 1. Add package
~~~shell
meteor add adain:https
meteor add force-ssl (optional)
~~~

### 2. You have to make your ssl certificate and key file. If you already have these, you can skip this step.
~~~shell
openssl genrsa -out server.key 2048
openssl req -new -sha256 -key server.key -out csr.pem
openssl x509 -req -in csr.pem -signkey server.key -out cert.pem
~~~

### 3. Set environment variables.
~~~shell
export USE_HTTPS='1'
export SSL_KEY_PATH=server.key
export SSL_CERT_PATH=cert.pem
export SSL_PORT=8443
export SSL_TARGET_IP=127.0.0.1
export SSL_TARGET_PORT=3000
~~~

### 4. Run meteor with environment variables.
~~~shell
meteor run -p 3000
~~~

If you want to use 443 port, you have to run with sudo or run with root permission.
~~~shell
sudo meteor run -p 3000
~~~

### 5. Access to https URL use your browser. (https://localhost)

## Environment variables description
USE_HTTPS : 1 = USE, 0 = NOT USE
SSL_KEY_PATH : SSL Key file path (default server.key)
SSL_CERT_PATH : SSL Certificate file path (default cert.pem)
SSL_PORT : SSL Port (default 8443)
SSL_TARGET_IP : Meteor server ip address or host (default 127.0.0.1)
SSL_TARGET_PORT : Meteor server port (default 3000)
NEVER_DIE : (OPTIONAL) 1 = USE, 0 = NOT USE (If this is variable set to 1 the meteor process never die.)