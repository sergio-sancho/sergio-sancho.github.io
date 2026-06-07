# sergio-sancho.github.io

Personal academic website of Sergio Sancho — a lightweight custom [Jekyll](https://jekyllrb.com/)
site served at <https://sergio-sancho.github.io/>.

## Editing content

Most content is data-driven — no HTML needed:

- **Publications** — add an entry to [`_data/publications.yml`](_data/publications.yml).
- **Other projects** — [`_data/projects.yml`](_data/projects.yml).
- **Education / teaching** — [`_data/education.yml`](_data/education.yml), [`_data/teaching.yml`](_data/teaching.yml).
- **Bio** — edit the intro section in [`index.html`](index.html).
- **Long-form write-ups** — add a Markdown file under [`_projects/`](_projects/). It becomes
  a page at `/projects/<filename>/`. To embed an interactive demo, list a script in the
  front matter (`scripts: [...]`, `module: true`) and put the JS under `assets/js/projects/`.

Visual style lives entirely in [`assets/css/style.scss`](assets/css/style.scss).

## Local preview

```bash
bundle install
bundle exec jekyll serve --livereload
# http://localhost:4000/
```
