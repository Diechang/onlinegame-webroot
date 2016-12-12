require 'compass/import-once/activate'
# Require any additional compass plugins here.

add_import_path "/Users/Daisuke/Dropbox/_materials/compass_imports";	# office
add_import_path "/Users/daisuke/Dropbox/_materials/compass_imports";	# home

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "css"
sass_dir = "sass"
images_dir = "img/design"
javascripts_dir = "js"

output_style = :expanded

relative_assets = true

line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

cache = false
asset_cache_buster :none