# Important considerations

I use a lot the readme to give instructions for any developer that needs to work on the project. Mainly the developer that does not frequently work on this project.

## Folder Structure

I reorganised the folders to avoid this project became messy.

In a big project, I prefer to add each feature in a separated folder like a module or use microservices method to avoid any part affect/break other ready feature when implementing it.

## New setup

I could implement a gulp setup and convert the code from ES6 to ES5 to fit to IE, but I chose to follow the guidelines: Implement new feature and just make little improvements to keep the code working fine.

But I added a new folder called `new_setup` with an example of the gulp file and readme that I created on my current company to use with Magento projects.

## Images

I reduced 40% of the size of the images using Adobe Photoshop. As this images small, we don't need to use the best quality ever. So, I optimize the application loading time.
Also, I changed the image format to JPG, because these images has no transparency.

I also add in a `small` folder, to keep the images organised. In the future we could need to add big images to show when user click on the item image.