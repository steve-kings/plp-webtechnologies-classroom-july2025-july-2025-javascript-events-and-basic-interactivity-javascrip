
        // ========================================
        // PART 1: EVENT HANDLING AND INITIALIZATION
        // ========================================
        
        /**
         * Initialize the application when DOM is fully loaded
         */
        document.addEventListener('DOMContentLoaded', function() {
            initializeApp();
        });

        /**
         * Main initialization function that sets up all event listeners and features
         */
        function initializeApp() {
            // Initialize dark mode
            initializeDarkMode();
            
            // Initialize interactive counter
            initializeCounter();
            
            // Initialize tabbed interface
            initializeTabs();
            
            // Initialize FAQ accordion
            initializeFAQ();
            
            // Initialize form validation
            initializeFormValidation();
            
            console.log('Interactive Web App initialized successfully!');
        }

        // ========================================
        // PART 2: INTERACTIVE ELEMENTS
        // ========================================

        /**
         * Dark Mode Toggle Feature
         * Allows users to switch between light and dark themes
         */
        function initializeDarkMode() {
            const darkModeToggle = document.getElementById('darkModeToggle');
            const darkModeIcon = document.getElementById('darkModeIcon');
            
            // Check for saved dark mode preference or default to light mode
            const isDarkMode = localStorage.getItem('darkMode') === 'true';
            
            // Apply initial theme
            if (isDarkMode) {
                document.documentElement.classList.add('dark');
                darkModeIcon.textContent = '☀️';
            }
            
            // Dark mode toggle event listener
            darkModeToggle.addEventListener('click', function() {
                const isCurrentlyDark = document.documentElement.classList.contains('dark');
                
                if (isCurrentlyDark) {
                    // Switch to light mode
                    document.documentElement.classList.remove('dark');
                    darkModeIcon.textContent = '🌙';
                    localStorage.setItem('darkMode', 'false');
                } else {
                    // Switch to dark mode
                    document.documentElement.classList.add('dark');
                    darkModeIcon.textContent = '☀️';
                    localStorage.setItem('darkMode', 'true');
                }
                
                // Add visual feedback
                darkModeToggle.classList.add('bounce-in');
                setTimeout(() => {
                    darkModeToggle.classList.remove('bounce-in');
                }, 600);
            });
        }

        /**
         * Interactive Counter Game
         * Demonstrates event handling with multiple button interactions
         */
        function initializeCounter() {
            let count = 0;
            let totalClicks = 0;
            let highScore = localStorage.getItem('counterHighScore') || 0;
            
            const counterDisplay = document.getElementById('counterDisplay');
            const clickCountDisplay = document.getElementById('clickCount');
            const highScoreDisplay = document.getElementById('highScore');
            const incrementBtn = document.getElementById('incrementBtn');
            const decrementBtn = document.getElementById('decrementBtn');
            const resetBtn = document.getElementById('resetBtn');
            
            // Display initial high score
            highScoreDisplay.textContent = highScore;
            
            /**
             * Update the counter display with animation
             */
            function updateCounter() {
                counterDisplay.textContent = count;
                counterDisplay.classList.add('bounce-in');
                setTimeout(() => {
                    counterDisplay.classList.remove('bounce-in');
                }, 600);
                
                // Update high score if current count is higher
                if (count > highScore) {
                    highScore = count;
                    highScoreDisplay.textContent = highScore;
                    localStorage.setItem('counterHighScore', highScore);
                    
                    // Show celebration animation for new high score
                    highScoreDisplay.classList.add('bounce-in');
                    setTimeout(() => {
                        highScoreDisplay.classList.remove('bounce-in');
                    }, 600);
                }
            }
            
            /**
             * Update click counter
             */
            function updateClickCount() {
                totalClicks++;
                clickCountDisplay.textContent = totalClicks;
            }
            
            // Increment button event listener
            incrementBtn.addEventListener('click', function() {
                count++;
                updateCounter();
                updateClickCount();
                
                // Visual feedback
                this.classList.add('scale-110');
                setTimeout(() => {
                    this.classList.remove('scale-110');
                }, 150);
            });
            
            // Decrement button event listener
            decrementBtn.addEventListener('click', function() {
                count--;
                updateCounter();
                updateClickCount();
                
                // Visual feedback
                this.classList.add('scale-110');
                setTimeout(() => {
                    this.classList.remove('scale-110');
                }, 150);
            });
            
            // Reset button event listener
            resetBtn.addEventListener('click', function() {
                count = 0;
                updateCounter();
                updateClickCount();
                
                // Visual feedback
                this.classList.add('scale-110');
                setTimeout(() => {
                    this.classList.remove('scale-110');
                }, 150);
            });
            
            // Keyboard event listeners for accessibility
            document.addEventListener('keydown', function(event) {
                if (event.key === 'ArrowUp') {
                    incrementBtn.click();
                } else if (event.key === 'ArrowDown') {
                    decrementBtn.click();
                } else if (event.key === 'r' || event.key === 'R') {
                    resetBtn.click();
                }
            });
        }

        /**
         * Tabbed Interface
         * Allows switching between different content sections
         */
        function initializeTabs() {
            const tabButtons = document.querySelectorAll('.tab-btn');
            const tabContents = document.querySelectorAll('.tab-content');
            
            /**
             * Switch to a specific tab
             */
            function switchTab(targetTab) {
                // Remove active class from all tabs and buttons
                tabButtons.forEach(btn => {
                    btn.classList.remove('text-primary', 'border-b-2', 'border-primary');
                    btn.classList.add('text-gray-500', 'dark:text-gray-400');
                });
                
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Add active class to selected tab and button
                const activeButton = document.querySelector(`[data-tab="${targetTab}"]`);
                const activeContent = document.getElementById(targetTab);
                
                activeButton.classList.remove('text-gray-500', 'dark:text-gray-400');
                activeButton.classList.add('text-primary', 'border-b-2', 'border-primary');
                
                activeContent.classList.add('active', 'fade-in');
                
                // Remove animation class after animation completes
                setTimeout(() => {
                    activeContent.classList.remove('fade-in');
                }, 500);
            }
            
            // Add click event listeners to tab buttons
            tabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const targetTab = this.getAttribute('data-tab');
                    switchTab(targetTab);
                });
                
                // Add hover effect
                button.addEventListener('mouseenter', function() {
                    if (!this.classList.contains('text-primary')) {
                        this.classList.add('text-primary');
                    }
                });
                
                button.addEventListener('mouseleave', function() {
                    if (!this.classList.contains('border-primary')) {
                        this.classList.remove('text-primary');
                        this.classList.add('text-gray-500', 'dark:text-gray-400');
                    }
                });
            });
        }

        /**
         * FAQ Accordion
         * Collapsible question and answer sections
         */
        function initializeFAQ() {
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');
                const icon = item.querySelector('.faq-icon');
                
                question.addEventListener('click', function() {
                    const isOpen = !answer.classList.contains('hidden');
                    
                    if (isOpen) {
                        // Close the FAQ item
                        answer.classList.add('hidden');
                        icon.textContent = '+';
                        icon.style.transform = 'rotate(0deg)';
                    } else {
                        // Close all other FAQ items first
                        faqItems.forEach(otherItem => {
                            const otherAnswer = otherItem.querySelector('.faq-answer');
                            const otherIcon = otherItem.querySelector('.faq-icon');
                            otherAnswer.classList.add('hidden');
                            otherIcon.textContent = '+';
                            otherIcon.style.transform = 'rotate(0deg)';
                        });
                        
                        // Open this FAQ item
                        answer.classList.remove('hidden');
                        answer.classList.add('slide-down');
                        icon.textContent = '−';
                        icon.style.transform = 'rotate(180deg)';
                        
                        // Remove animation class after animation completes
                        setTimeout(() => {
                            answer.classList.remove('slide-down');
                        }, 300);
                    }
                });
            });
        }

        // ========================================
        // PART 3: FORM VALIDATION
        // ========================================

        /**
         * Form Validation System
         * Comprehensive validation for all form fields with real-time feedback
         */
        function initializeFormValidation() {
            const form = document.getElementById('registrationForm');
            const fields = {
                fullName: document.getElementById('fullName'),
                email: document.getElementById('email'),
                phone: document.getElementById('phone'),
                password: document.getElementById('password'),
                confirmPassword: document.getElementById('confirmPassword'),
                age: document.getElementById('age'),
                terms: document.getElementById('terms')
            };
            
            // Add real-time validation to each field
            Object.keys(fields).forEach(fieldName => {
                const field = fields[fieldName];
                
                if (fieldName === 'terms') {
                    field.addEventListener('change', () => validateField(fieldName));
                } else {
                    field.addEventListener('blur', () => validateField(fieldName));
                    field.addEventListener('input', () => {
                        // Clear error state on input
                        clearFieldError(fieldName);
                        
                        // Special handling for password strength
                        if (fieldName === 'password') {
                            updatePasswordStrength(field.value);
                        }
                    });
                }
            });
            
            // Form submit event listener
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                
                if (validateForm()) {
                    showSuccessMessage();
                    form.reset();
                    clearAllErrors();
                } else {
                    // Add shake animation to form for invalid submission
                    form.classList.add('error-shake');
                    setTimeout(() => {
                        form.classList.remove('error-shake');
                    }, 500);
                }
            });
            
            /**
             * Validate individual field
             */
            function validateField(fieldName) {
                const field = fields[fieldName];
                const value = field.type === 'checkbox' ? field.checked : field.value.trim();
                let isValid = true;
                let errorMessage = '';
                
                switch (fieldName) {
                    case 'fullName':
                        if (!value) {
                            errorMessage = 'Full name is required.';
                            isValid = false;
                        } else if (value.length < 2) {
                            errorMessage = 'Full name must be at least 2 characters long.';
                            isValid = false;
                        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                            errorMessage = 'Full name should only contain letters and spaces.';
                            isValid = false;
                        }
                        break;
                        
                    case 'email':
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!value) {
                            errorMessage = 'Email address is required.';
                            isValid = false;
                        } else if (!emailRegex.test(value)) {
                            errorMessage = 'Please enter a valid email address.';
                            isValid = false;
                        }
                        break;
                        
                    case 'phone':
                        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                        if (!value) {
                            errorMessage = 'Phone number is required.';
                            isValid = false;
                        } else if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                            errorMessage = 'Please enter a valid phone number.';
                            isValid = false;
                        }
                        break;
                        
                    case 'password':
                        if (!value) {
                            errorMessage = 'Password is required.';
                            isValid = false;
                        } else if (value.length < 8) {
                            errorMessage = 'Password must be at least 8 characters long.';
                            isValid = false;
                        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                            errorMessage = 'Password must contain at least one uppercase letter, one lowercase letter, and one number.';
                            isValid = false;
                        }
                        break;
                        
                    case 'confirmPassword':
                        const passwordValue = fields.password.value;
                        if (!value) {
                            errorMessage = 'Please confirm your password.';
                            isValid = false;
                        } else if (value !== passwordValue) {
                            errorMessage = 'Passwords do not match.';
                            isValid = false;
                        }
                        break;
                        
                    case 'age':
                        const ageValue = parseInt(value);
                        if (!value) {
                            errorMessage = 'Age is required.';
                            isValid = false;
                        } else if (isNaN(ageValue) || ageValue < 13 || ageValue > 120) {
                            errorMessage = 'Please enter a valid age between 13 and 120.';
                            isValid = false;
                        }
                        break;
                        
                    case 'terms':
                        if (!value) {
                            errorMessage = 'You must agree to the terms and conditions.';
                            isValid = false;
                        }
                        break;
                }
                
                if (!isValid) {
                    showFieldError(fieldName, errorMessage);
                } else {
                    clearFieldError(fieldName);
                }
                
                return isValid;
            }
            
            /**
             * Validate entire form
             */
            function validateForm() {
                let isFormValid = true;
                
                Object.keys(fields).forEach(fieldName => {
                    if (!validateField(fieldName)) {
                        isFormValid = false;
                    }
                });
                
                return isFormValid;
            }
            
            /**
             * Show field error message
             */
            function showFieldError(fieldName, message) {
                const errorElement = document.getElementById(`${fieldName}Error`);
                const fieldElement = fields[fieldName];
                
                errorElement.textContent = message;
                errorElement.classList.remove('hidden');
                fieldElement.classList.add('border-red-500', 'dark:border-red-500');
                fieldElement.classList.remove('border-gray-300', 'dark:border-gray-600');
            }
            
            /**
             * Clear field error message
             */
            function clearFieldError(fieldName) {
                const errorElement = document.getElementById(`${fieldName}Error`);
                const fieldElement = fields[fieldName];
                
                errorElement.classList.add('hidden');
                fieldElement.classList.remove('border-red-500', 'dark:border-red-500');
                fieldElement.classList.add('border-gray-300', 'dark:border-gray-600');
            }
            
            /**
             * Clear all error messages
             */
            function clearAllErrors() {
                Object.keys(fields).forEach(fieldName => {
                    clearFieldError(fieldName);
                });
                
                // Hide password strength indicator
                document.getElementById('passwordStrength').classList.add('hidden');
            }
            
            /**
             * Update password strength indicator
             */
            function updatePasswordStrength(password) {
                const strengthContainer = document.getElementById('passwordStrength');
                const strengthBar = document.getElementById('strengthBar');
                const strengthText = document.getElementById('strengthText');
                
                if (!password) {
                    strengthContainer.classList.add('hidden');
                    return;
                }
                
                strengthContainer.classList.remove('hidden');
                
                let strength = 0;
                let strengthLabel = '';
                let strengthColor = '';
                
                // Calculate strength based on various criteria
                if (password.length >= 8) strength++;
                if (/[a-z]/.test(password)) strength++;
                if (/[A-Z]/.test(password)) strength++;
                if (/\d/.test(password)) strength++;
                if (/[^a-zA-Z0-9]/.test(password)) strength++;
                
                // Determine strength level and styling
                switch (strength) {
                    case 0:
                    case 1:
                        strengthLabel = 'Very Weak';
                        strengthColor = 'bg-red-500';
                        break;
                    case 2:
                        strengthLabel = 'Weak';
                        strengthColor = 'bg-orange-500';
                        break;
                    case 3:
                        strengthLabel = 'Fair';
                        strengthColor = 'bg-yellow-500';
                        break;
                    case 4:
                        strengthLabel = 'Good';
                        strengthColor = 'bg-blue-500';
                        break;
                    case 5:
                        strengthLabel = 'Strong';
                        strengthColor = 'bg-green-500';
                        break;
                }
                
                // Update strength bar
                strengthBar.className = `h-2 rounded-full transition-all duration-300 ${strengthColor}`;
                strengthBar.style.width = `${(strength / 5) * 100}%`;
                
                // Update strength text
                strengthText.textContent = strengthLabel;
                strengthText.className = `text-xs mt-1 ${strengthColor.replace('bg-', 'text-')}`;
            }
            
            /**
             * Show success message
             */
            function showSuccessMessage() {
                const successMessage = document.getElementById('successMessage');
                successMessage.classList.remove('hidden');
                successMessage.classList.add('fade-in');
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                    successMessage.classList.remove('fade-in');
                }, 5000);
            }
        }

        // ========================================
        // ADDITIONAL EVENT LISTENERS
        // ========================================

        /**
         * Handle system dark mode preference changes
         */
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        }
        
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (event.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        });

        /**
         * Add smooth scrolling for internal links
         */
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        /**
         * Add loading states for better UX
         */
        function showLoading(element) {
            const originalText = element.textContent;
            element.textContent = 'Loading...';
            element.disabled = true;
            
            return () => {
                element.textContent = originalText;
                element.disabled = false;
            };
        }

        // Console welcome message
        console.log('%c🚀 Interactive Web App by Stephen Kingori', 'color: #5D5CDE; font-size: 16px; font-weight: bold;');
        console.log('%cThis application demonstrates:', 'color: #666; font-size: 14px;');
        console.log('• Event handling and DOM manipulation');
        console.log('• Interactive UI components');
        console.log('• Form validation with real-time feedback');
        console.log('• Responsive design and accessibility');
        console.log('• Modern JavaScript practices');