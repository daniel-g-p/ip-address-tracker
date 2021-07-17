# Shortly - URL Shortening Tool

This IP address tracker is a tool that can be used to test the tracability of your device or any IP address or domain registered on the internet. The tool will indicate on a map where exactly the IP address you searched for is located.

## Table of Contents

1. [Background](#background)
2. [Features](#features)
3. [Technologies](#technologies)
4. [Development](#devlopment)
5. [References](#references)

## Motivation

In order to work on my ability to integrate web APIs into my projects, I took on this challenge from Frontend Mentor. The challenged also happened to require the use of "localStorage", which was a new concept that I wanted to explore.

## Technologies

### HTML, CSS, JAVASCRIPT

This project was built responsively with HTML, CSS, and JS in their purest form. The design attempts to replicate the template provided by the challenge as closely as possible. Aside from the integration of the API itself, one of the more challenging aspects of the project was adding animations to element that were created dynamically through the DOM.

### Shrtcode API

The main tool on the website is powered by the free Shrtcode API, which is used to shorten URLs and save them as more compact links.

### Vercel

In order to deploy the project, I used the free hosting platform Vercel.

## Features

### Link Shortening and Saving

Clicking any of the "Get Started" buttons on the page will take you to the main section, which contains a form that you can use to submit any URL that you want to shorten. The URL you enter is validated on the front end and assuming that it is valid, it will be processed, shortened, and added to your link list. The latter allows you to copy the short link directly to your clipboard.

### List Clearing

All the links you shorten are saved with "localStorage", but you can clear all links whenever you like using the "Clear all links" button.

## Project Status

Although the tool might seem fully fucntional, I would like to add a functionality to it that will allow users to remove individual links from their list, as this currently isn't possible. Aside from that, I may turn this one-page project into a multipage site that includes a "Features" and a "Pricing" page as suggested by the links in the header
