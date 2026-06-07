source "https://rubygems.org"

# NOTE on hosting vs. local preview:
# GitHub Pages builds this site natively on its servers using its own pinned
# "github-pages" environment (Jekyll 3.9) — it does NOT run this Gemfile. This
# site only uses core Jekyll features (collections, _data, includes, SCSS) that
# behave identically across Jekyll 3.9 and 4.x, so the deployed build is safe.
#
# This Gemfile is purely for *local preview*. The github-pages gem's frozen deps
# can't run on current Ruby (4.x), so we use a modern Jekyll here instead.
gem "jekyll", "~> 4.3"

group :jekyll_plugins do
  gem "jekyll-sass-converter"
end

# Required for `jekyll serve` on Ruby 3+ (WEBrick left the stdlib).
gem "webrick"

# Stdlib gems unbundled in recent Ruby that Jekyll's deps still require.
gem "csv"
gem "base64"
gem "bigdecimal"
gem "logger"
gem "ostruct"
