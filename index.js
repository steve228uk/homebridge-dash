'use strict';

var dash = require('node-dash-button');
var Characteristic, Service;
var switchService;

module.exports = function(homebridge){
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;

	homebridge.registerAccessory('homebridge-dash', 'Dash', DashAccessory, false);
};

function DashAccessory(log, config, api) {

	this.log = log;
	this.config = config;
	this.mac = config.mac;
	this.name = config.name || 'Amazon Dash';
	this.protocol = config.protocol || 'all';
	this.isOn = false;

	this.infoService = new Service.AccessoryInformation();
	this.infoService
        .setCharacteristic(Characteristic.Manufacturer, 'Amazon Technologies Inc.')
        .setCharacteristic(Characteristic.Model, 'AmazonDash')
        .setCharacteristic(Characteristic.SerialNumber, this.mac);

	this.switchService = new Service.Switch();
	this.switchService.setCharacteristic(Characteristic.On, this.isOn)
		.on('get', this.getState.bind(this))
		.on('set', this.setState.bind(this));

	var dashButton = dash(this.mac, null, null, this.protocol);
	dashButton.on('detected', function() {
		this.on = !this.on;
		this.switchService.setCharacteristic(Characteristic.On, this.on);
	}.bind(this));

}

DashAccessory.prototype.identify = function(callback) {
	this.log('Identify requested!');
	callback();
};

DashAccessory.prototype.getServices = function() {
	return [this.infoService, this.switchService];
};

DashAccessory.prototype.getState = function(callback) {
	return callback(null, this.isOn);
};

DashAccessory.prototype.setState = function(value, callback) {
	this.isOn = value;
	callback();
};
