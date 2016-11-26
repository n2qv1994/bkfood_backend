function User() {
    this.username = "";
    this.password = "";
    this.email = "";
    this.name = "";
    this.sex = "";
    this.phone = "";
    this.location = "";
    this.avatar = "";
    this.status = false; // is logined or not?
    this.role = 0; //
    this.time_begin = new Date();
    this.time_end = new Date();
    this.radius = 0;

};
User.prototype.setUsername = function(username) {
    this.username = username;
    return this;
};
User.prototype.getUsername = function() {
    return this.username;
};
User.prototype.setEmail = function(email) {
    this.email = email;
    return this;
};
User.prototype.getEmail = function() {
    return this.email;
};
User.prototype.setPassword = function(password) {
    this.password = password;
    return this;
};
User.prototype.getPassword = function() {
    return this.password;
};
User.prototype.setName = function(name) {
    this.name = name;
    return this;
};
User.prototype.getName = function() {
    return this.name;
};
User.prototype.setSex = function(sex) {
    this.sex = sex;
    return this;
};
User.prototype.getSex = function() {
    return this.sex;
};
User.prototype.setPhone = function(phone) {
    this.phone = phone;
    return this;
};
User.prototype.getPhone = function() {
    return this.phone;
};
User.prototype.setLocation = function(location) {
    this.location = location;
    return this;
};
User.prototype.getLocation = function() {
    return this.location;
};
User.prototype.setAvatar = function(avatar) {
    this.avatar = avatar;
    return this;
};
User.prototype.getAvatar = function() {
    return this.avatar;
};
User.prototype.setStatus = function(status) {
    this.status = status;
    return this;
};
User.prototype.getStatus = function() {
    return this.status;
};

User.prototype.setRole = function(role) {
    this.role = role;
    return this;
};

User.prototype.getRole = function() {
    return this.role;
};

User.prototype.setTimeBegin = function(time) {
    this.time_begin = time;
    return this;
};

User.prototype.getTimeBegin = function() {
    return this.time_begin;
};

User.prototype.setTimeEnd = function(time) {
    this.time_end = time;
    return this;
};

User.prototype.getTimeEnd = function() {
    return this.time_end;
};

User.prototype.setRadius = function(radius) {
    this.radius = radius;
    return this;
};

User.prototype.getRadius = function() {
    return this.radius;
};

module.exports = User;
