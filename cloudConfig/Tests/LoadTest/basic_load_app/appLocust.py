import time
from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    wait_time = between(1, 10)

    @task
    def index_page(self):
        self.client.get(url="/")

    @task
    def signin_page(self):
        self.client.get(url="/signin")

    @task
    def signup_page(self):
        self.client.get(url="/signup")

    @task
    def product_page_detail(self):
        self.client.get(url="/produto?id=991")
    
    @task
    def search_product_list(self):
        self.client.get(url="/pesquisa?searchName=a")