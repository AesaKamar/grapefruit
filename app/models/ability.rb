  class Ability
  include CanCan::Ability

  def initialize(user)
    # Define abilities for the passed in user here. For example:
    #
    #   user ||= User.new # guest user (not logged in)
    #   if user.admin?
    #     can :manage, :all
    #   else
    #     can :read, :all
    #   end
    #
    # The first argument to `can` is the action you are giving the user 
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on. 
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, :published => true
    #
    # See the wiki for details:
    # https://github.com/ryanb/cancan/wiki/Defining-Abilities

    if user.is_admin?
      can :manage_admins, User
      can :manage, :all
    else

      can :manage, Course do |course|
        course.instructor == user
      end

      can :manage, Capsule do |capsule|
        capsule.course.instructor == user
      end

      can :manage, Lecture do |lecture|
        lecture.capsule.course.instructor == user
      end

      can :manage, ProblemSet do |problem_set|
        problem_set.capsule.course.instructor == user
      end

      can :manage, Document do |document|
        if document.course
          document.course.instructor == user
        elsif document.capsule
          document.capsule.course.instructor == user
        else
          document.lecture.capsule.course.instructor == user
        end
      end

    end

  end
end
