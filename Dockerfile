FROM nginx:1.9-alpine

MAINTAINER Jim Mar <majinjing3@gmail.com>
ENV CREATE_DATE 2016-04-23

ENV NGINX_HTML_DIR /usr/share/nginx/html/
ENV TIDY_URL ctidy.com:8089
ENV HTTP http

#ADD views/* ${NGINX_HTML_DIR}/
COPY views/index.html ${NGINX_HTML_DIR}/
COPY views/favicon.ico ${NGINX_HTML_DIR}/
COPY views/auth/* ${NGINX_HTML_DIR}/auth/
COPY views/checkin/* ${NGINX_HTML_DIR}/checkin/
COPY views/static/* ${NGINX_HTML_DIR}/static/
COPY views/templates/* ${NGINX_HTML_DIR}/templates/
COPY views/user/* ${NGINX_HTML_DIR}/user/
COPY views/logo/* ${NGINX_HTML_DIR}/logo/
COPY conf/nginx.conf /etc/nginx/nginx.conf
COPY conf/nginx.tidy.default.conf /etc/nginx/conf.d/default.conf

RUN find ${NGINX_HTML_DIR} -name "*.html" -exec \
        sed -i "s/http:\/\/127.0.0.1:8089/${HTTP}:\/\/${TIDY_URL}/g" {} \; && \
        chown -R nginx:nginx ${NGINX_HTML_DIR}

WORKDIR /usr/share/nginx/html/

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
