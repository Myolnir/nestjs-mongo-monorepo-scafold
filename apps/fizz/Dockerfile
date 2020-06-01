FROM node:12

ENV NAME api
ENV SERVICE fizz
ENV USER fizz-user

RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    bash \
    build-essential \
    python \
    --no-install-recommends

RUN groupadd -r $USER && useradd -r -g $USER -G audio,video $USER \
    && mkdir -p /home/$USER && chown -R $USER:$USER /home/$USER

RUN mkdir -p /opt/$NAME

WORKDIR opt/$NAME

COPY package.json package.json

COPY entrypoint.sh entrypoint.sh

COPY tsconfig.json tsconfig.json
COPY tsconfig.build.json tsconfig.build.json
COPY nest-cli.json nest-cli.json
COPY apps/$SERVICE apps/$SERVICE
COPY libs libs

RUN chmod +x entrypoint.sh

RUN npm install && npm install -g typeorm && npm run build $SERVICE

EXPOSE 3001

ENTRYPOINT ["./entrypoint.sh"]
