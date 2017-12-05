PROJECTNAME = 2020-candidate-bot
HOMEDIR = $(shell pwd)
USER = bot
SERVER = smidgeo
SSHCMD = ssh $(USER)@$(SERVER)
APPDIR = /opt/$(PROJECTNAME)

pushall: sync
	git push origin master

sync:
	rsync -a $(HOMEDIR) $(USER)@$(SERVER):/opt --exclude node_modules/ --exclude raw-data
	$(SSHCMD) "cd $(APPDIR) && npm install"

test:
	node tests/candidate-tests.js

prettier:
	prettier --single-quote --write "**/*.js"
