import os
import sys

import click

from app import create_app

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

app = create_app('development')



@app.cli.command()
def test():
    import pytest
    exit_code = pytest.main(["tests/", '--verbose'])
    return exit_code

if __name__ == '__main__':
    app.run(host="localhost")
