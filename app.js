var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
	flash       = require("connect-flash"),
    LocalStrategy = require("passport-local"),
	methodOverride= require("method-override"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds")
    
//requring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")
    

mongoose.connect("mongodb+srv://userdatabase:Yelpcamp123@cluster0.0lolt.mongodb.net/yelppcampp?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true});


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"))
app.use(flash())
// seedDB(); //seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
	res.locals.error = req.flash("error")
	res.locals.success = req.flash("success")
   next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// app.listen(6987, function(){
//    console.log("The YelpCamp Server 6987 has started");
// });

app.listen(6987 || process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});

// var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
// var server_host = process.env.YOUR_HOST || '0.0.0.0';
// server.listen(server_port, server_host, function() {
//     console.log('Listening on port %d', server_port);
// });