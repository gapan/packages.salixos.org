
.PHONY: js
js:
	babel -o pkg.js \
		src/Screen.js \
		src/Repo.js \
		src/RepoList.js \
		src/Action.js \
		src/common.js
