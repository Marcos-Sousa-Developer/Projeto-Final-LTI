import time
from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    wait_time = between(1, 10)

    headers = {
        "identification": "U2FsdGVkX1+UaElUa+9DfTT4lR71HuVaEquYI+j2YxJ/AofaIDBcnYteskoZkDrF",
    }

    @task
    def api_ads1(self):
        self.client.get(url="/ads",headers=self.headers)

    @task
    def api_ads2(self):
        self.client.delete(url="/ads/1",headers=self.headers)
    
    @task
    def api_ads3(self):
            
        params = {
            "title": "electronics",
            "description": "electronics",
            "email": "electronics@gmail.com",
            "mobile_number": "916191614",
            "extraCharacteristics": "{video:'game'}",
            "status": 1,
            "price": 250,
            "production_date": "2022-07-01",
            "supplier_id": 1,
            "product_id": 1,
            "category_name": "Tecnologia",
            "subcategory_name": "Telemóveis e Tablets",
            "subsubcategory_name": "Telemóveis",
        }
        self.client.post(url="/ads",headers=self.headers, params=params)


    @task
    def api_categories(self):
        self.client.get(url="/categories",headers=self.headers)

    @task
    def api_subcategories(self):
        self.client.get(url="/subcategories",headers=self.headers)

    @task
    def api_subsubcategories(self):
        self.client.get(url="/subsubcategories",headers=self.headers)

    @task
    def api_orderedProducts(self):
        self.client.get(url="/orderedProducts",headers=self.headers)

    @task
    def api_page(self):
        self.client.get(url="/productionUnits",headers=self.headers)

    @task
    def api_page(self):
        self.client.get(url="/productProductionUnits",headers=self.headers)