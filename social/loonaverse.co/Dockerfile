# vim: ft=dockerfile
FROM mhart/alpine-node:10
ENV appdir /app
# hadolint ignore=DL3018
RUN mkdir -p ${appdir} && \
    addgroup -g 1000 -S node && \
    adduser -u 1000 -S node -G node
WORKDIR ${appdir}
COPY --chown=node:node . .
USER node
ENV NODE_ENV=production \
    TERM=linux \
    TERMINFO=/etc/terminfo \
    HOST=loonaverse.co \
    PORT=9000
EXPOSE 9000
HEALTHCHECK --interval=30s \
    --timeout=2s \
    --start-period=10s \
    --retries=10 \
  CMD node ${appdir}/healthcheck.js
CMD ["node", "."]
