FROM centos/nodejs-8-centos7

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

ENV PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

RUN chmod +x /opt/app-root/src/.nvm/nvm.sh \
    && unset NPM_CONFIG_PREFIX \
    && source /opt/app-root/src/.nvm/nvm.sh \
    && nvm install 10.15.1 \
    && nvm ls \
    && node -v

COPY docker-entrypoint.sh /opt/app-root/src/
RUN ls -l /opt/app-root/src

ENTRYPOINT ["/opt/app-root/src/docker-entrypoint.sh"]
