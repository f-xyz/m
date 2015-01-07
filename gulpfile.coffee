gulp   = require('gulp')
exec   = require('child_process').exec
colors = require('colors')
_      = require('lodash')

gulp.watch('./**/*.js').on 'change', () ->
  clear()
  test()

gulp.task 'default', () ->
  clear()
  test()

test  = () ->
  exec 'mocha', (err, stdout) ->
    console.log(
      stdout
        .toString()
        .split /\r?\n/
        .map highlight
        .join '\n'
    )

highlight = (x) ->
  switch
    when /^\s{2}[^\s]/.test x then x.green
    when /^\s*\d/.test x then x.red
    else x

clear = () -> process.stdout.write '\u001b[2J\u001b[0;0H'