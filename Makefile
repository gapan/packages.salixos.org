SSH_HOST=salixos.org
SSH_PORT=22
SSH_USER=web
SSH_TARGET_DIR=/srv/www/packages.salixos.org
NGINX_PORT ?= 3001
GIT_PUBLISH_BRANCH=dist

DIST_DIR=dist

.PHONY: build
build: clean
	rm -rf dist
	mkdir dist
	git worktree prune
	rm -rf .git/worktrees/dist/
	git worktree add -B dist dist origin/$(GIT_PUBLISH_BRANCH)
	rm -rf dist/*
	$(MAKE) js
	$(MAKE) css
	$(MAKE) html
	cp -r fonts $(DIST_DIR)/
	cp -r img $(DIST_DIR)/
	cp favicon/* $(DIST_DIR)/
	touch dist/.nojekyll dist/.keep

.PHONY: js
js:
	npx babel -o $(DIST_DIR)/site.js \
		src/Screen.js \
		src/Repo.js \
		src/RepoList.js \
		src/RepoManager.js \
		src/Action.js \
		src/init.js

.PHONY: css
css:
	npx minify src/site.css > $(DIST_DIR)/site.css

.PHONY: html
html:
	npx minify src/index.html > $(DIST_DIR)/index.html

.PHONY: clean
clean:
	rm -rf $(DIST_DIR)/*

.PHONY: upload
upload: build
	rsync -e "ssh -p $(SSH_PORT)" \
		-avz \
		--delete $(DIST_DIR)/ \
		$(SSH_USER)@$(SSH_HOST):$(SSH_TARGET_DIR)/

.PHONY: serve
serve:
	docker run --rm -p $(NGINX_PORT):80 \
		--name packages.salixos.org \
		-v $$(pwd)/dist:/usr/share/nginx/html:ro \
		nginx:stable-alpine

publish: build
	cd dist && \
	git add --all && \
	git commit -m "Publish on `LANG=C.utf8 date`" && \
	git push -u origin dist
