SSH_HOST=salixos.org
SSH_PORT=22
SSH_USER=web
SSH_TARGET_DIR=/srv/www/packages.salixos.org

.PHONY: js
js:
	npx babel -o pkg.js \
		src/Screen.js \
		src/Repo.js \
		src/RepoList.js \
		src/RepoManager.js \
		src/Action.js \
		src/init.js

.PHONY: upload
upload: js
	rsync -e "ssh -p $(SSH_PORT)" \
		-avz \
		--exclude ".git" \
		--exclude ".gitignore" \
		--exclude .eslintrc.js \
		--exclude Makefile \
		--exclude TODO \
		--exclude src \
		--exclude node_modules \
		--exclude "*~" \
		--delete-excluded \
		--delete ./ $(SSH_USER)@$(SSH_HOST):$(SSH_TARGET_DIR)

