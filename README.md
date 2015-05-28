# Examples for the course MIA / MOB6 on hybrid mobile app development

This repo contains examples to assist students in their quest of creating a hybrid mobile app using Cordova/PhoneGap.

## Flurry Flakes

### Purpose
The main purpose of the Flurry Flakes app is to show how all relevant elements of a hybrid mobile app can be made to work. It requires the use of a Cordova plugin, loading data from an external service, communicating with a PHP back-end.

### UI
The UI of the app is based on jQueryMobile. jQueryMobile is relatively simple to learn and allows to use standard HTML to create the mobile views while using simple jQuery event handlers to handle the view controllers. While not giving the best performance, jQueryMobile works well on all major platforms and allows the developer to forget all the details of view transitions.

### Plugins
**org.apache.cordova.device-motion** This plugin allows the app to read the accelerometer sensor. It is used to allow the user to navigate a list of cartoons by tilting the device. This could (but completely doens't) create a more natural way of navigating such lists.

### External services
**Tumblr** The cartoons shown in the app are loaded from a Tumblr stream in JSONP format. Tumblr is used because the cartoons are published there anyway on a blog and updates there propagate then immediately to this awesome mobile app.

### Back-end
**POST flakes.php** *name* The mobile app can submit names to the back-end, which are stored in an SQL database. It serves no purpose whatsoever in this app except for demonstrational purposes.

**GET flakes.php** Gets the full list of submitted names back in JSON format. The list is dynamically rendered in the UI using jQuery.
