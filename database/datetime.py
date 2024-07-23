from datetime import datetime


class EpisodeDateTime:
    """A class to handle date and time operations."""

    @staticmethod
    def parse_date(date_string):
        """Parses a date string in the format 'Month DD, YYYY'.
        Returns a datetime.date object."""
        return datetime.strptime(date_string, '%B %d, %Y').date()

    @staticmethod
    def format_date(date_object):
        """Formats a datetime.date object into a
        string in the format 'Month DD, YYYY'."""
        return date_object.strftime('%B %d, %Y')

    @staticmethod
    def is_valid_date(date_string):
        """Checks if a given string represents a valid date.
        Returns True if valid, False otherwise."""
        try:
            EpisodeDateTime.parse_date(date_string)
            return True
        except ValueError:
            return False
