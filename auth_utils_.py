from database_system import *

def is_logged_in(fn):
    '''Returns true or false if user is logged in'''
    def inner(request, *args):
        if request.get_secure_cookie('username', None) is None:
            return fn(request, False, *args)
        else:
            return fn(request, True, *args)
    return inner

def needs_login(fn):
    '''If user is logged in function will process normally, otherwise redirect to /404'''
    def inner(request, *args):
        cookie = request.get_secure_cookie('username', None)
        if cookie is None:
            # TODO: this should be a 403 page (or possibly a 401?)
            request.redirect(r'/404')
        else:
            # Cookie is bytestring, convert to regular string
            uname = cookie.decode('utf-8')
            
            users = User.find("username", uname)
            if len(users) > 0:
                request.user = users[0]
                return fn(request, *args)
            else:
                request.clear_cookie('username')
                request.redirect('/')
    return inner
