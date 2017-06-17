
.PHONY: js
js:
	babel -o pkg.js \
		src/Screen.js \
		src/Repo.js \
		src/RepoList.js \
		src/RepoManager.js \
		src/Action.js \
		src/init.js
