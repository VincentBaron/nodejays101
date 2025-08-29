#!/bin/bash

# Test runner script for NodeJays101 project
# This script runs tests for both backend and frontend

echo "🧪 Running NodeJays101 Test Suite"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to run backend tests
run_backend_tests() {
    echo -e "\n${YELLOW}🏗️  Running Backend Tests (NestJS)${NC}"
    echo "-----------------------------------"
    
    if [ ! -f "nestjs-package.json" ]; then
        echo -e "${RED}❌ nestjs-package.json not found. Please ensure you're in the project root.${NC}"
        return 1
    fi
    
    # Copy package.json and install dependencies if needed
    if [ ! -f "package.json" ] || [ "nestjs-package.json" -nt "package.json" ]; then
        echo "📦 Updating package.json from nestjs-package.json..."
        cp nestjs-package.json package.json
        npm install
    fi
    
    # Run backend tests
    echo "🔍 Running unit tests..."
    npm test -- --testPathPattern="nestjs-src" --passWithNoTests
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Backend tests passed${NC}"
        return 0
    else
        echo -e "${RED}❌ Backend tests failed${NC}"
        return 1
    fi
}

# Function to run frontend tests
run_frontend_tests() {
    echo -e "\n${YELLOW}🎨 Running Frontend Tests (React)${NC}"
    echo "----------------------------------"
    
    if [ ! -d "frontend" ]; then
        echo -e "${RED}❌ Frontend directory not found${NC}"
        return 1
    fi
    
    cd frontend
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        echo "📦 Installing frontend dependencies..."
        npm install
    fi
    
    # Run frontend tests
    echo "🔍 Running component and integration tests..."
    npm test -- --watchAll=false --passWithNoTests
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Frontend tests passed${NC}"
        cd ..
        return 0
    else
        echo -e "${RED}❌ Frontend tests failed${NC}"
        cd ..
        return 1
    fi
}

# Function to run tests with coverage
run_with_coverage() {
    echo -e "\n${YELLOW}📊 Running Tests with Coverage${NC}"
    echo "==============================="
    
    # Backend coverage
    echo "🏗️  Backend coverage..."
    npm test -- --coverage --testPathPattern="nestjs-src" --passWithNoTests
    
    # Frontend coverage
    echo "🎨 Frontend coverage..."
    cd frontend
    npm run test:coverage -- --watchAll=false --passWithNoTests
    cd ..
    
    echo -e "\n${GREEN}📈 Coverage reports generated:${NC}"
    echo "   Backend: coverage/lcov-report/index.html"
    echo "   Frontend: frontend/coverage/lcov-report/index.html"
}

# Function to lint code
run_linting() {
    echo -e "\n${YELLOW}🔍 Running Code Linting${NC}"
    echo "======================="
    
    # Backend linting
    echo "🏗️  Linting backend..."
    npm run lint || echo "Backend linting completed with warnings"
    
    # Frontend linting
    echo "🎨 Linting frontend..."
    cd frontend
    npm run lint || echo "Frontend linting completed with warnings"
    cd ..
}

# Main execution
main() {
    case "${1:-all}" in
        "backend"|"be")
            run_backend_tests
            ;;
        "frontend"|"fe")
            run_frontend_tests
            ;;
        "coverage"|"cov")
            run_with_coverage
            ;;
        "lint")
            run_linting
            ;;
        "all"|*)
            echo "🚀 Running all tests..."
            
            BACKEND_RESULT=0
            FRONTEND_RESULT=0
            
            run_backend_tests
            BACKEND_RESULT=$?
            
            run_frontend_tests
            FRONTEND_RESULT=$?
            
            echo -e "\n${YELLOW}📋 Test Summary${NC}"
            echo "==============="
            
            if [ $BACKEND_RESULT -eq 0 ]; then
                echo -e "Backend:  ${GREEN}✅ PASSED${NC}"
            else
                echo -e "Backend:  ${RED}❌ FAILED${NC}"
            fi
            
            if [ $FRONTEND_RESULT -eq 0 ]; then
                echo -e "Frontend: ${GREEN}✅ PASSED${NC}"
            else
                echo -e "Frontend: ${RED}❌ FAILED${NC}"
            fi
            
            if [ $BACKEND_RESULT -eq 0 ] && [ $FRONTEND_RESULT -eq 0 ]; then
                echo -e "\n${GREEN}🎉 All tests passed! 🎉${NC}"
                exit 0
            else
                echo -e "\n${RED}💥 Some tests failed${NC}"
                exit 1
            fi
            ;;
    esac
}

# Help function
show_help() {
    echo "NodeJays101 Test Runner"
    echo "======================"
    echo ""
    echo "Usage: ./test.sh [command]"
    echo ""
    echo "Commands:"
    echo "  all (default)  Run all tests (backend + frontend)"
    echo "  backend|be     Run only backend tests"
    echo "  frontend|fe    Run only frontend tests"
    echo "  coverage|cov   Run tests with coverage reports"
    echo "  lint           Run code linting"
    echo "  help           Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./test.sh              # Run all tests"
    echo "  ./test.sh backend      # Run only backend tests"
    echo "  ./test.sh coverage     # Run with coverage"
    echo ""
}

# Check for help flag
if [ "${1}" = "help" ] || [ "${1}" = "-h" ] || [ "${1}" = "--help" ]; then
    show_help
    exit 0
fi

# Run main function
main "$1"
