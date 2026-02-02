
# Project Blueprint

## Overview

This project is a web application that uses a machine learning model to identify and classify dog faces in real-time through a webcam. It is built with HTML, CSS, and JavaScript, and it utilizes the Teachable Machine platform for the image classification model. The application will be deployed on Firebase Hosting.

## Implemented Features

*   **Image File Upload**: The application allows users to upload an image file (JPG, PNG, etc.) instead of requiring a webcam.
*   **Dog Face Classification**: It uses a pre-trained Teachable Machine model to classify dog faces in the uploaded image and display the predicted probabilities.
*   **Firebase Integration**: The project is set up with Firebase for future scalability and feature additions.

## Current Plan

1.  **Restored Site Functionality**: Temporarily disabled Firebase Analytics tags in `index.html` to resolve the "firebase is not defined" error.
2.  **Switch to File Upload**: (Completed) Refactored the application to use file upload instead of webcam.
3.  **Analytics Integration**: (Completed) Replaced the problematic Firebase Analytics script with the standard Google Analytics (GA4) tag (`G-26181B8TV3`) to ensure tracking works in all environments (preview & production).
4.  **Refine the User Interface**: Continue improving the visual layout and user experience.
