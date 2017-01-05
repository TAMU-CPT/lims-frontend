import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class LimsEnvSampleCreate(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_login(self):
        driver = self.driver
        driver.get("http://localhost:10000/login")
        self.assertIn("LIMS", driver.title)

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
