import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

# set up virtualenv
# activate venv
# create user

class LimsEnvSampleCreate(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_login(self):
        driver = self.driver
        driver.get("http://localhost:10000/#/login")
        # driver.implicitly_wait(2)
        login_button = driver.find_element_by_xpath("//md-card-content/button")
        username = driver.find_element_by_xpath("//input[@name='name']")
        password = driver.find_element_by_xpath("//input[@name='password']")
        username.send_keys("user") # set up above
        password.send_keys("password") # set up above
        login_button.click()
        time.sleep(5)

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
