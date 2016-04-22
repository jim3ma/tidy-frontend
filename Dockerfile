FROM nginx:1.9-alpine

MAINTAINER Jim Mar <majinjing3@gmail.com>

COPY views/* /usr/share/nginx/html/
COPY conf/nginx.conf /etc/nginx/nginx.conf
COPY conf/nginx.vh.default.conf /etc/nginx/conf.d/default.conf

ENV TIDY_URL tidy.com
ENV HTTP http

RUN find /tidy-frontend -name "*.html" | \
        xargs sed -i "s/http:\/\/127.0.0.1:8089/${HTTP}:\/\/${TIDY_URL}/g"
RUN chown -R nginx:nginx /usr/share/nginx/html/

WORKDIR /tidy-frontend

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
