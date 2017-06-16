
.PHONY: js
js:
	babel -o pkg.js \
		src/Screen.js \
		src/Repo.js \
		src/common.js \
		src/model.js
