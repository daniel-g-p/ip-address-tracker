# IP Address Tracker

This IP address tracker is a tool that can be used to test the tracability of your device or any IP address or domain registered on the internet. The tool will indicate on a map where exactly the IP address you searched for is located.

## Table of Contents

* [Background](#background)
* [Features](#features)
* [Technologies](#technologies)
* [Development](#development)
* [Status](#status)

## Motivation

This project was primarily meant as a practice project with the purpose of developing my skills working with APIs. It utilizes two APIs and combines the data fetched from both into one coherent tool.

## Features

The IP address tracker allows user to search for any IP address or domain to trace its location. It also offers automatic geolocation and IP address detection, provided the user grants permission for the application to do so.

## Technologies

The project was built with HTML, CSS, and JavaScript and two APIs. The [Ipify API](https://geo.ipify.org/) is used for everything related to IP addresses and domains and forms the basis of the application. Based on the data fetched from the Ipify API, [Mapbox](https://www.mapbox.com/) was used to create a custom map theme that automatically locates the user, allows them to recenter the map, and automatically navigates to a new location whene a new search query is started.

## Status

Though fully functional, there is one minor bug in the application that occurs when the user collapses the search bar to enlargen the map. A white border that the map should usually extend into may appear at the bottom on your device, and I will hopefully get to fix the issue soon.
