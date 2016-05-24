FROM nginx:1.10-alpine

MAINTAINER Jim Mar <majinjing3@gmail.com>
ENV CREATE_DATE 2016-04-23

ENV NGINX_HTML_DIR /usr/share/nginx/html

COPY conf/nginx.conf /etc/nginx/nginx.conf
COPY conf/nginx.tidy.default.conf /etc/nginx/conf.d/default.conf
ADD dist ${NGINX_HTML_DIR}

RUN chown -R nginx:nginx ${NGINX_HTML_DIR}

WORKDIR /usr/share/nginx/html/

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
