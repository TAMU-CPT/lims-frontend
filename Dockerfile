FROM quay.io/tamu_cpt/frontend-builder

ADD . /app
WORKDIR /app

RUN make node_modules && \
	npm rebuild node-sass && \
	make build && \
	cp *.html /output/ && \
	cp -Rv css /output/ && \
	cp -Rv img /output/ && \
	cp -Rv build/ /output/ && \
	cp -Rv partials/ /output/ && \
	cp manifest.json /output/
