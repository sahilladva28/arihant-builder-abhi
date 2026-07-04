.PHONY: help dev build start lint clean rotate-pin view-logs

help:
	@echo "Arihant Registry Desk - Security Administration Automation Control"
	@echo "=================================================================="
	@echo "Available commands:"
	@echo "  make dev         - Start development server on port 3000 (Express + Vite)"
	@echo "  make build       - Compile the production assets and bundler"
	@echo "  make start       - Run the production build of Express + Vite"
	@echo "  make lint        - Perform code typing validation and checks"
	@echo "  make clean       - Remove compiled build outputs and log targets"
	@echo "  make rotate-pin  - Generate a secure new admin PIN in /admin_password.txt"
	@echo "  make view-logs   - Print current server administrative audit logs"

dev:
	npm run dev

build:
	npm run build

start:
	npm run start

lint:
	npm run lint

clean:
	npm run clean
	rm -f admin_access.log

rotate-pin:
	@echo "Generating new random secure PIN..."
	@PIN=$$(shuf -i 1000-9999 -n 1); \
	echo "$$PIN" > admin_password.txt; \
	echo "SUCCESS: Admin access PIN updated to: $$PIN (Saved in /admin_password.txt)"

view-logs:
	@if [ -f admin_access.log ]; then \
		cat admin_access.log; \
	else \
		echo "No admin access logs recorded yet."; \
	fi
