# aspnet_with_webpack

This project demonstrates how to use [webpack](https://webpack.js.org/) within an [ASP.NET MVC 5](https://docs.microsoft.com/en-us/aspnet/mvc/mvc5) project.

See my [blog post](https://medium.com/@jonjam/combining-webpack-with-asp-net-mvc-5-a5bd07c49d0b) for more details.

# Changes

1. Introduced font-awesome
2. Changed font extract to put into fonts directory
3. Introduce url-loader so we can pre-process images
3. Changed from loaders: to rules: as per webpack 2+
4. Turn off amd validation in prod due to https://github.com/aspnet/jquery-validation-unobtrusive/issues/79
5. Introduced asset-map-webpack-plugin and helper clas so we can reference webpacked images etc in ASP.NET pages