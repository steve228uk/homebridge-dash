# homebridge-dash
### A Homebridge plugin for the Amazon Dash Button.

This plugin integrates with Homebridge to create a switch that can automate other accessories and platforms.

## Installation

### Prerequisites

1. Ensure `libpcap-dev` is installed on your system
2. Ensure you know the MAC address of the button you wish to listen to

### npm

Installation is via npm.

````
npm install -g homebridge-dash
````

If you encounter an error you may need to run the following command instead.

````
sudo npm install -g --unsafe-perm homebridge
````

### Config + Running

Check the `config-sample.json` for an example on how to configure the plugin. You can configure as many buttons as you wish.

Homebridge **must** be run with elevated privileges to work correctly i.e. sudo or root.

## Troubleshooting

If this freezes the wlan on your Raspberry Pi you may need to use a different Wi-Fi dongle. I've had success with [this one](http://amzn.to/2ffl5XI).
