SSH_HOST=salixos.org
SSH_PORT=22
SSH_USER=web
SSH_TARGET_DIR=/srv/www/packages.salixos.org
NGINX_PORT ?= 3001
DIST_DIR=dist

.PHONY: build
build:
	rm -rf $(DIST_DIR)
	mkdir -p $(DIST_DIR)
	git worktree prune
	rm -rf .git/worktrees/$(DIST_DIR)/
	git worktree add -B $(DIST_DIR) $(DIST_DIR) origin/$(DIST_DIR)
	rm -rf $(DIST_DIR)/*
	$(MAKE) js
	$(MAKE) css
	$(MAKE) html
	cp -r fonts $(DIST_DIR)/
	cp -r img $(DIST_DIR)/
	cp favicon/* $(DIST_DIR)/
	touch $(DIST_DIR)/.nojekyll $(DIST_DIR)/.keep

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
		-v $$(pwd)/$(DIST_DIR):/usr/share/nginx/html:ro \
		nginx:stable-alpine

publish: build
	cd $(DIST_DIR) && \
	git add --all && \
	git commit -m "Publish on `LANG=C.utf8 date`" && \
	git push -u origin $(DIST_DIR)
