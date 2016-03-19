
const _renderPostPage =function *(){
  if(this.isAuthenticated()){
    this.render('postPage/index');
  }else{
    this.session['returnTo'] = '/post';
    this.redirect('/login');
  }
};

module.exports = {
  renderPostPage:_renderPostPage
}
